// fn newCanvas(w: Int, h: Int) -> Int= "canvas""newCanvas"

// fn updateCanvas(id: Int, )

extern type Canvas_ctx

fn set_stroke_color(self : Canvas_ctx, color : Int) = "canvas" "set_stroke_color"

fn set_line_width(self : Canvas_ctx, width : Double) = "canvas" "set_line_width"

fn stroke_rect(self : Canvas_ctx, x : Int, y : Int, width : Int, height : Int) = "canvas" "stroke_rect"

fn fill_rect(self : Canvas_ctx, x : Int, y : Int, width : Int, height : Int) = "canvas" "fill_rect"

fn set_fill_style(self : Canvas_ctx, color : Int) = "canvas" "set_fill_style"


pub fn draw(canvas : Canvas_ctx, snake : GameState) -> Unit {
  let mut c = 0

  // draw backgroud
  while c < grid_col_count {
    canvas.set_fill_style(0)
    canvas.fill_rect(c, 0, 1, grid_row_count)
    c = c + 1
  }
  
  draw_piece(canvas, snake.grid, (0, 0))
}

pub fn draw_piece(canvas : Canvas_ctx, matrix : Array[Int],
        offset : (Int, Int)) -> Unit {

  let mut r = 0
  let mut c = 0
  let mut c0 = 0
  while c < matrix.length() {
    if matrix[c] == 0 {
      c = c + 1
      continue
    }
    c0 = c % grid_col_count
    r = c / grid_col_count
    canvas.set_fill_style(matrix[c] + 1)
    canvas.fill_rect( offset.0 + c0, r, 1, 1)
    canvas.set_stroke_color(1)
    canvas.set_line_width(0.1)
    canvas.stroke_rect( c0, r, 1, 1)
    c = c + 1
  }
}

