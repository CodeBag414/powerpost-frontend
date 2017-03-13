import { SEARCH_BING, 
         SEARCH_BING_SUCCESS,
         SEARCH_BING_ERROR,
         CREATE_MEDIA_ITEM,
         TOGGLE_LINK_EDITOR,
         FETCH_COLLECTIONS,
         FETCH_COLLECTIONS_ERROR,
         FETCH_COLLECTIONS_SUCCESS,
         FETCH_MEDIA_ITEMS,
         FETCH_MEDIA_ITEMS_SUCCESS,
         FETCH_MEDIA_ITEMS_ERROR,
         CREATE_MEDIA_ITEM_SUCCESS,
         CREATE_MEDIA_ITEM_ERROR,
         GET_URL_CONTENT_ERROR,
         GET_URL_CONTENT_SUCCESS
} from './constants';

export function fetchCollections(accountId) {
    return {
        type: FETCH_COLLECTIONS,
        accountId
    };
}
