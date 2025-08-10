export interface QuoteFragment {
  _id: string;
  author: {
    _id: string;
    _title: string;
    image: {
      url: string;
      alt: string;
    };
    company: {
      _title: string;
      image: {
        url: string;
        alt: string;
      };
    };
    role: string;
  };
  quote: string;
}
