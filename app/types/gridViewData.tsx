import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const MAX_ATOM_SIZE = 200
const MIN_ATOM_SIZE = 15

interface gridViewDataType {
  pixel_scale: number; // no of seconds per pixel
  atom_scale: duration.Duration;
  cell_count: number;
  atom_count: number;
  atom_coloring: Array<string>;
  atom_height: number;

  readonly atom_width: number;
}

export class gridViewDataTypeClass implements gridViewDataType {
  // public pixel_scale: duration.Duration; // no of seconds per pixel
  public pixel_scale: number; // no of seconds per pixel
  public atom_scale: duration.Duration;
  public cell_count: number;
  public atom_count: number;
  public atom_coloring: Array<string>;
  public atom_height: number;

  constructor(params: {
    pixel_scale: number, // no of seconds per pixe,
    atom_scale: duration.Duration,
    cell_count: number,
    atom_count: number,
    atom_coloring: Array<string>,
    atom_height: number,
  }) {
    // this.pixel_scale = dayjs.duration(params.pixel_scale, "s");
    this.pixel_scale = params.pixel_scale;
    this.atom_scale = params.atom_scale;
    this.cell_count = params.cell_count;
    this.atom_count = params.atom_count;
    this.atom_coloring = params.atom_coloring;
    this.atom_height = 80;
  }

  get atom_width(): number {
    return (
      20 * this.pixel_scale / this.atom_count
    );
  }
}
