export class WidgetsContainerOptions {
    public displayGrid: string;
    public draggable: {};
    public resizable: {};
    public minCols: number;
    public minRows: number;

    constructor(displayGrid: string = "", draggable: {} = {}, resizable: {} = {}, minCols: number = 0, minRows: number = 0) {
        this.displayGrid = displayGrid;
        this.draggable = draggable;
        this.resizable = resizable;
        this.minCols = minCols;
        this.minRows = minRows;
    }
}