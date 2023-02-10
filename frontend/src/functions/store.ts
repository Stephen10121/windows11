import { writable } from "svelte/store";

export type Menu = {
    x: number;
    y: number;
    show: boolean;
};

export type IconType = {
	id: string;
	name: string;
	img: string;
	focus: boolean;
	click: boolean;
};

export const windowIcons = writable<IconType[]>([
    {
      id: "iconRecycle",
      name: "Recycle Bin",
      img: "recycle.png",
      focus: false,
      click: false,
    },
    {
      id: "iconFolder",
      name: "File Explorer",
      img: "folder.png",
      focus: false,
      click: false,
    },
    {
      id: "iconFolder1",
      name: "File Explorer",
      img: "folder.png",
      focus: false,
      click: false,
    },
    {
      id: "iconAboutMe",
      name: "aboutMe.txt",
      img: "txtfile.ico",
      focus: false,
      click: false,
    },
]);

export const lightTheme = writable<boolean>(false);