pub fn main_new() -> GameState{
  return new()
}

pub fn main_step(game: GameState, a: Int) -> Unit {
  tran_step(game, a)
}

pub fn main_draw(canvas : Canvas_ctx, game : GameState) -> Unit {
  draw(canvas, game)
}

fn main {
  ()
}
