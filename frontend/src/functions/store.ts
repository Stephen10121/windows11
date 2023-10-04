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
		action: { id: "aboutmenotepad", name: "aboutMe.txt", appType: "notepad", textData: "Hello World!\nMy name is Stephen Gruzin.", minimized: false, icon: "notepad.png", fullScreen: false }
	},
	{
		id: "iconFolder",
		name: "File Explorer",
		img: "folder.png",
		focus: false,
		click: false,
		action: { id: "aboutmenotepad", name: "aboutMe.txt", appType: "notepad", textData: "Hello World!\nMy name is Stephen Gruzin.", minimized: false, icon: "notepad.png", fullScreen: false }
	},
	{
		id: "iconFolder1",
		name: "File Explorer",
		img: "folder.png",
		focus: false,
		click: false,
		action: { id: "fileexplorer", name: "FileTree", appType: "notepad", textData: "This is the file explorer.", minimized: false, icon: "notepad.png", fullScreen: false }
	},
	{
		id: "iconAboutMe",
		name: "aboutMe.txt",
		img: "txtfile.ico",
		focus: false,
		click: false,
		action: { id: "aboutmenotepad", name: "aboutMe.txt", appType: "notepad", textData: "Hello World!\nMy name is Stephen Gruzin.", minimized: false, icon: "notepad.png", fullScreen: false }
	},
]);

type NotepadApp = {
	appType: "notepad",
	textData: string
}

type BasicWindow = {
	appType: "window"
}

export type WindowBox = {
	id: string,
	name: string,
	minimized: boolean,
	fullScreen: boolean,
	icon: string
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

export function minimizeWindow(id: string) {
	let newFocused: string = "";
	windows.update((oldWindows) => {
		let newWindows: WindowBox[] = [];
		for (let i=0;i<oldWindows.length;i++) {
			if (oldWindows[i].id===id) {
				newWindows.push({...oldWindows[i], minimized: true });
			} else {
				newWindows.push(oldWindows[i]);
				if (!oldWindows[i].minimized) {
					newFocused = oldWindows[i].id;
				}
			}
		}
		return newWindows;
	});
	focused.set(newFocused);
}

export function changeFullscreen(id: string) {
	windows.update((oldWindows) => {
		let newWindows: WindowBox[] = [];
		for (let i=0;i<oldWindows.length;i++) {
			if (oldWindows[i].id===id) {
				newWindows.push({...oldWindows[i], fullScreen: !oldWindows[i].fullScreen });
			} else {
				newWindows.push(oldWindows[i]);
			}
		}
		return newWindows;
	});
}