import React from 'react';
import {IDatabaseContract} from '../components/contracts/DatabaseContract';
import {PodcastModel} from '../components/models/PodcastModel';
import {SqlLiteService} from '../services/sqlLiteServices';

interface DBContextPRops {
  podcasts: PodcastModel[];
  subToPodcast: (podcast: PodcastModel) => Promise<void>;
}

export const DBContext = React.createContext<DBContextPRops>({
  podcasts: [],
  subToPodcast: () => Promise.resolve(),
});

export const DBProvider: React.FC = (props) => {
  const [podcasts, setPodcasts] = React.useState<PodcastModel[]>([]);

  const db = React.useRef<IDatabaseContract | null>(null);
  const dbReady = db.current?.isReady;

  React.useEffect(() => {
    db.current = new SqlLiteService();
  }, []);

  React.useEffect(() => {
    if (dbReady) {
      (async () => {
        if (db.current) {
          const _podcasts = await db.current.getAllPodcast();
          setPodcasts(_podcasts);
        }
      })();
    }
  }, [dbReady]);

  const subToPodcast = async (podcast: PodcastModel) => {
    if (db.current) {
      await db.current.subscribeToPodCast(podcast);
      const _podcasts = await db.current.getAllPodcast();
      setPodcasts(_podcasts);
    }
  };
  const value: DBContextPRops = {
    podcasts,
    subToPodcast,
  };
  return (
    <DBContext.Provider value={value}>{props.children}</DBContext.Provider>
  );
};
