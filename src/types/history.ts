import { ITheme } from '@uifabric/styling';

export interface IHistoryItem {
  url: string;
  method: string;
  headers: Array<{ name: string; value: string; }>;
  category?: string;
  body?: string;
  runTime: string;
  status: number;
  statusText: string;
  response?: Response;
  responseHeaders: Array<{ name: string; value: string; }>;
  duration: number;
  result: object;
  har: string;
}

export interface IHistoryProps {
  actions?: {
    runQuery: Function;
    setSampleQuery: Function;
  };
  theme?: ITheme;
  styles?: object;
  requestHistory: Array<{
    url: string;
    method: string;
    headers?: Array<{ name: string; value: string; }>;
    category?: string;
    body?: string;
    runTime: string;
    status: number;
    response: object;
    duration: number;
  }>;
}
