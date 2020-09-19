import {IDatabaseContract} from './../components/contracts/DatabaseContract';
import SQLite from 'react-native-sqlite-storage';
import {PodcastModel} from '../components/models/PodcastModel';

export class SqlLiteService implements IDatabaseContract {
  public isReady = false;
  private _db: SQLite.SQLiteDatabase;

  constructor() {
    this._db = SQLite.openDatabase(
      {
        name: 'db.sqlite',
        location: 'Documents',
      },
      () => {
        console.log(' sql database connected');
        this.init();
      },
      (error) => {
        console.log('SQL DAtabase error ', error);
      },
    );
  }

  private async init() {
    await this._db.executeSql(`
      CREATE TABLE IF NOT EXISTS podcasts (
        name VARCHAR(255) UNIQUE,
        episodes_count INT DEFAULT 0,
        feed_url TEXT,
        artist TEXT,
        thumbnail TEXT
      );
    `);

    this.isReady = true;
  }

  getAllPodcast(): Promise<PodcastModel[]> {
    const podcasts: PodcastModel[] = [];
    return new Promise((resolve, reject) => {
      this._db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM podcasts;',
          [],
          (tx, results) => {
            for (let i = 0; i < results.rows.length; i++) {
              const row = results.rows.item(i);
              podcasts.push(
                new PodcastModel({
                  name: row.name,
                  artist: row.artist,
                  epidsodeCount: row.episodes_count,
                  feedUrl: row.feed_url,
                  thumbnail: row.thumbnail,
                }),
              );
            }
            resolve(podcasts);
          },
          (_, error) => {
            console.log('get all podcasts error', error);
            reject(error);
          },
        );
      });
    });
  }
  subscribeToPodCast(podcast: PodcastModel): Promise<void> {
    return new Promise((resolve, reject) => {
      this._db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO podcasts (artist, episodes_count, feed_url, name, thumbnail) VALUES ($1, $2, $3, $4, $5)',
          [
            podcast.artist,
            podcast.epidsodeCount,
            podcast.feedUrl,
            podcast.name,
            podcast.thumbnail,
          ],
          () => {
            console.log('podcast insert');
            resolve();
          },
          (_, err) => {
            console.log('error insert podcast', err);
            reject(err);
          },
        );
      });
    });
  }
}
