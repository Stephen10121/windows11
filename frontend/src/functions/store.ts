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
	action: WindowBox
};

export const windowIcons = writable<IconType[]>([
	{
		id: "iconRecycle",
		name: "Recycle Bin",
		img: "recycle.png",
		focus: false,
		click: false,
		action: { id: "aboutmenotepad", name: "aboutMe.txt", appType: "notepad", textData: "Hello World!\nMy name is Stephen Gruzin." }
	},
	{
		id: "iconFolder",
		name: "File Explorer",
		img: "folder.png",
		focus: false,
		click: false,
		action: { id: "aboutmenotepad", name: "aboutMe.txt", appType: "notepad", textData: "Hello World!\nMy name is Stephen Gruzin." }
	},
	{
		id: "iconFolder1",
		name: "File Explorer",
		img: "folder.png",
		focus: false,
		click: false,
		action: { id: "fileexplorer", name: "FileTree", appType: "notepad", textData: "This is the file explorer." }
	},
	{
		id: "iconAboutMe",
		name: "aboutMe.txt",
		img: "txtfile.ico",
		focus: false,
		click: false,
		action: { id: "aboutmenotepad", name: "aboutMe.txt", appType: "notepad", textData: "Hello World!\nMy name is Stephen Gruzin." }
	},
]);

type NotepadApp = {
	appType: "notepad",
	textData: string
}

type BasicWindow = {
	appType: "window",
	icon: string
}

export type WindowBox = {
	id: string,
	name: string
} & (NotepadApp | BasicWindow)

export const lightTheme = writable<boolean>(false);
export const hitbox = writable<boolean>(false);
export const focused = writable<string>(null);
export const windows = writable<WindowBox[]>([]);

export function addWindow(newWindow: WindowBox) {
	windows.update((oldWindows) => {
		let newWindows = oldWindows;
		let duplicate = false;
		for (let i=0;i<oldWindows.length;i++) {
			if (oldWindows[i].id === newWindow.id) duplicate = true;
		}
		if (!duplicate) newWindows.push(newWindow)
		return newWindows;
	});
	focused.set(newWindow.id);
}