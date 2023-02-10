import type { IconType } from "src/functions/store";

export type MouseInfo = {
	x: number;
	y: number;
	down: boolean;
};

function getPositions(elem: HTMLElement): [number, number][] {
	let pos = elem.getBoundingClientRect();
	return [
		[pos.left, pos.right],
		[pos.top, pos.bottom]
	];
}

function comparePositions(p1: number[], p2: number[]): boolean {
	var r1: number[], r2: number[];

	r1 = p1[0] < p2[0] ? p1 : p2;
	r2 = p1[0] < p2[0] ? p2 : p1;

	return r1[1] > r2[0] || r1[0] === r2[0];
}

function detectOverlap(a: HTMLElement, b: HTMLElement): boolean {
	let pos1 = getPositions(a);
	let pos2 = getPositions(b);

	return (
		comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1])
	);
};


export function mouseMove(mouseMovedEvent: MouseEvent, mouseIsDownInformation: MouseInfo, hightlightBox: HTMLElement, icons: IconType[], isFolderSelected: boolean): {icons: IconType[], folderSelected: boolean} {
	let folderSelected = isFolderSelected;

	if (!mouseIsDownInformation.down) return {icons, folderSelected};

	hightlightBox.style.left = mouseMovedEvent.clientX < mouseIsDownInformation.x ? `${mouseMovedEvent.clientX}px` : `${mouseIsDownInformation.x}px`;
	hightlightBox.style.width = mouseMovedEvent.clientX < mouseIsDownInformation.x ? `${mouseIsDownInformation.x - mouseMovedEvent.clientX}px` : `${mouseMovedEvent.clientX - mouseIsDownInformation.x}px`;
	
	hightlightBox.style.top = mouseMovedEvent.clientY < mouseIsDownInformation.y ? `${mouseMovedEvent.clientY}px` : `${mouseIsDownInformation.y}px`;
	hightlightBox.style.height = mouseMovedEvent.clientY < mouseIsDownInformation.y ? `${mouseIsDownInformation.y - mouseMovedEvent.clientY}px` : `${mouseMovedEvent.clientY - mouseIsDownInformation.y}px`;

	for (let i = 0; i < icons.length; i++) {
		let boxOverlappingHighlight = detectOverlap(hightlightBox, document.getElementById(icons[i].id));
		if (boxOverlappingHighlight) {
			icons[i].focus = true;
			folderSelected = true;
		} else {
			icons[i].focus = false;
		}
	}
	return {icons, folderSelected};
}