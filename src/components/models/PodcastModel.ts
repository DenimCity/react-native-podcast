export class PodcastModel {
  public artist: string;
  public epidsodeCount: number;
  public feedUrl: string;
  public name: string;
  public thumbnail: string;

  constructor(params: {
    artist: string;
    epidsodeCount: number;
    feedUrl: string;
    name: string;
    thumbnail: string;
  }) {
    this.artist = params.artist;
    this.epidsodeCount = params.epidsodeCount;
    this.feedUrl = params.feedUrl;
    this.name = params.name;
    this.thumbnail = params.thumbnail;
  }
}
