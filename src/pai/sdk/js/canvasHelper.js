// Optional Canvas Helper
class CanvasAPI {
    constructor(canvas) { this.canvas = canvas; this.ctx = canvas.getContext('2d'); }
    clear() { this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); }
    fillRect(x, y, w, h, color) { this.ctx.fillStyle = color; this.ctx.fillRect(x, y, w, h); }
    drawCircle(x, y, r, color) { this.ctx.fillStyle = color; this.ctx.beginPath(); this.ctx.arc(x, y, r, 0, Math.PI * 2); this.ctx.fill(); }
}
sdk.setCanvasAPI(new CanvasAPI(document.createElement('canvas')));
