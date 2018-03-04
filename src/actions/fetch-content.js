import axios from 'axios';
import each from 'lodash/each';
import moment from 'moment';
import values from 'lodash/values';

import * as actTypes from './act-types.js';

import { appContext } from '../misc';
const dbg = appContext.mkDbgLog('actFetchContent');
const contentSrc = appContext.dataContent;

const dispRcvContent = (dispatch, data) => {
  const items = {};
  each(data || [], (item) => {
    const { src } = item;
    if (!src) {
      return;
    }
    items[src] = {
      src: appContext.mkImgSitePath(src),
      thumbnail: appContext.mkImgSitePath(item.thumbnail || src),
      size: { width: 480, height: 480 },
      sizeThumbnail: { width: 220, height: 220 },
      tags: item.tags || [],
      caption: item.caption || '',
      date: item.date ? moment(item.date, 'YYYY-MM-DD') : undefined
    };
  });

  dispatch({
    type: actTypes.RCV_CONTENT,
    data: values(items)
  });  
};

export const fetchContent = () => { 
  dbg('fetch content from %s', contentSrc);

  return (dispatch) => {
    axios({
      url: appContext.dataContent,
      timeout: appContext.timeoutVal,
      method: 'get',
      responseType: 'json'
    }).then(rep => {
      dbg('loaded content from %s', contentSrc);
      dispRcvContent(dispatch, rep.data);
    }).catch(err => {
      dbg('fetch err (%s): %s', contentSrc, err.toString());
      dispatch({
        type: actTypes.RCV_CONTENT_ERR,
        err: err.toString()
      });
    });
  };
};

