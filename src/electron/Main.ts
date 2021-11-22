import {
  app,
  BrowserWindow,
  nativeImage,
  ipcMain,
  NativeImage,
  Menu,
} from "electron";
import { i18n } from "i18next";
import path from "path";
import Bootstrap from "./Bootstrap";
import createMenuTemplate from "./Menu";
import Maker from "../app/database/factory/maker";
import { createConnection } from "typeorm";
import { Book } from "../app/database/models/book.schema";
import { User } from "../app/database/models/user.schema";
import EventInterface from "./eventInterface";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export default class Main {
  private bootstrap = new Bootstrap();
  private translations: i18n;

  public async start(): Promise<void> {
    this.handleWindowsShortcuts();
    await this.setListeners();
    this.setIpcMainListeners();
  }

  protected async setListeners(): Promise<void> {
    app.on("ready", async () => {
      await this.createWindow();
    });

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        await this.createWindow();
      }
    });
  }

  protected async createWindow(): Promise<void> {
    const connection = await createConnection({
      type: "sqlite",
      synchronize: true,
      logging: true,
      logger: "simple-console",
      database: "./src/database/database.sqlite",
      entities: [Book, User],
    });

    ipcMain.on("add", async (event, content: EventInterface[]) => {
      const repository = Maker.make(connection, content[0].entity);
      event.returnValue = await repository.add(content[0].value);
    });

    ipcMain.on("edit", async (event, content: EventInterface[]) => {
      const repository = Maker.make(connection, content[0].entity);
      event.returnValue = await repository.edit(content[0].value);
    });

    ipcMain.on("delete", async (event, content: EventInterface[]) => {
      const repository = Maker.make(connection, content[0].entity);
      event.returnValue = await repository.delete(content[0].value);
    });

    ipcMain.on("show", async (event, content: EventInterface[]) => {
      const repository = Maker.make(connection, content[0].entity);
      event.returnValue = await repository.show(content[0].value);
    });

    ipcMain.on("getAll", async (event, content: EventInterface[]) => {
      const repository = Maker.make(connection, content[0].entity);
      event.returnValue = await repository.getAll(content[0]);
    });

    const mainWindow = new BrowserWindow({
      icon: this.getIcon(),
      height: 600,
      width: 800,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    mainWindow.webContents.openDevTools();

    mainWindow.once("ready-to-show", () => {
      mainWindow.show();
    });

    await this.handleTranslations(mainWindow);
  }

  protected getIcon(): NativeImage {
    return nativeImage.createFromPath(
      path.resolve(
        __dirname,
        "..",
        "renderer",
        "main_window",
        "assets",
        "images",
        "librarian.png"
      )
    );
  }

  protected async handleTranslations(window: BrowserWindow): Promise<void> {
    this.translations = await this.bootstrap.startI18n();

    Menu.setApplicationMenu(
      Menu.buildFromTemplate(
        await createMenuTemplate(
          window,
          this.translations,
          this.bootstrap.getLanguages()
        )
      )
    );

    this.translations.on("loaded", () => {
      this.translations.changeLanguage("en-US");
      this.translations.off("loaded");
    });

    this.translations.on("languageChanged", (lng: string) => {
      window.webContents.send("language-changed", {
        language: lng,
        namespace: "common",
        resource: this.translations.getResourceBundle(lng, "common"),
      });
    });
  }

  protected setIpcMainListeners(): void {
    ipcMain.on("get-initial-translations", async (event) => {
      let initial: any;
      await Promise.all(
        this.bootstrap.getLanguages().map(async (item) => {
          await this.translations.loadLanguages(item, () => {
            const lang = {
              [item]: {
                common: this.translations.getResourceBundle(item, "common"),
              },
            };
            initial = { ...initial, ...lang };
          });
        })
      );
      event.returnValue = initial;
    });

    ipcMain.on("get-theme", (event, content) => {
      const menu = Menu.getApplicationMenu();
      menu.getMenuItemById("dark-theme").checked = content as boolean;
    });
  }

  protected handleWindowsShortcuts(): void {
    // Handle creating/removing shortcuts on Windows when installing/uninstalling.
    if (require("electron-squirrel-startup")) {
      // eslint-disable-line global-require
      app.quit();
    }
  }
}
