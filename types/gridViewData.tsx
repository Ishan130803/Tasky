import dayjs, { Dayjs, extend } from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const MAX_ATOM_SIZE = 200
const MIN_ATOM_SIZE = 15

export interface zoomViewsMetaData {
  grid_span: duration.Duration;
  view_name : 'daily' | 'weekly' | 'monthly' | 'yearly';
  cell_count: number;
  atom_count: number;
  atom_coloring: Array<string>;
}

export interface gridViewDataType extends zoomViewsMetaData {
  pixel_scale: number; //no. of milliseconds a pixel is representing
  scaling_factor:number; //Scales the pixel_scale

  atom_height: number;
  atom_width:number;
  gridStartingBound : dayjs.Dayjs;
}

export class gridViewDataTypeClass implements gridViewDataType {
  // public pixel_scale: duration.Duration; // no of seconds per pixel
  public grid_span: duration.Duration
  public cell_count: number;
  public atom_count: number;
  public atom_coloring: Array<string>;
  public atom_height: number;
  public gridStartingBound : dayjs.Dayjs;
  public pixel_scale: number; //no. of milliseconds a pixel is representing
  public scaling_factor:number; //Scales the pixel_scale

  constructor(params:gridViewDataType) {
    // this.pixel_scale = dayjs.duration(params.pixel_scale, "s");
    this.pixel_scale = params.pixel_scale
    this.atom_coloring = params.atom_coloring
    this.atom_count = params.atom_count
    this.atom_height = params.atom_height
    this.grid_span = params.grid_span
    this.cell_count = params.cell_count
    this.gridStartingBound = params.gridStartingBound
    this.scaling_factor = params.scaling_factor
    
  }

  get actual_pixel_scale():number {
    return this.pixel_scale * this.
  }

  get atom_width(): number {
    return (
      20 * this.pixel_scale / this.atom_count
    );
  }

  get gridEndingBound(): dayjs.Dayjs {
    return this.gridStartingBound.add(this.atom_scale.asSeconds() * this.atom_count * this.cell_count,'s')
  }
}
