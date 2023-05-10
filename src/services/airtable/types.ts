type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type Attachment = {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: Thumbnail;
    large: Thumbnail;
  };
};

export type SeismReport = {
  id: string;
  report: Attachment[];
};

export type NewsFeedStory = {
  id: string;
  text: string;
  created_at: string;
};
