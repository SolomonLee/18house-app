import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apis/apiAlbums";

const initialState = {
    status: "done", // loading , done
    types: [],
    datas: [],
    homeRefs: [], // for Home

    dataTypes: [], // for /Album filter e.g. [{ title: 類別, name: 手工藝 }, { title: 類別, name: 水墨畫 }]
    datasRefs: [], // for /Album
    dataRef: null, // for /Product
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const updateAsync = createAsyncThunk(
//     "constellation/update",
//     async data => {
//         const response = await api.login(data);
//         return response.data;
//     }
// );

export const updateAlbumsAsync = createAsyncThunk(
    "apis/apiAlbums/updateAlbums",
    async () => {
        const responseAlbums = await api.getAlbums();
        const responseHomeAlbumIds = await api.getHomeAlbumIds();
        const responsegetAlbumTypes = await api.getAlbumTypes();

        return {
            Albums: responseAlbums,
            HomeAlbumIds: responseHomeAlbumIds,
            AlbumTypes: responsegetAlbumTypes,
        };
    }
);

export const albumsSlice = createSlice({
    name: "albums",
    initialState,
    reducers: {
        selectByFilter: (state, action) => {
            //   console.log("selectByFilter ==========");
            //   console.log(
            //     "selectByFilter action.payload.length",
            //     action.payload.length
            //   );
            let _datasRefs;
            if (action.payload.length) {
                const setIds = new Set();

                // use type and find pid
                action.payload.forEach((filterType) => {
                    state.types.forEach((type) => {
                        if (filterType.title == type.title) {
                            type.contents.forEach((content) => {
                                if (content.name === filterType.name) {
                                    if (content.pids.length === 0) {
                                        state.datas.forEach((data) =>
                                            setIds.add(data.pid)
                                        );
                                    } else {
                                        content.pids.forEach((pid) =>
                                            setIds.add(pid)
                                        );
                                    }
                                }
                            });
                        }
                        // return filterType.title == type.title && type.contents.find(content=> content.name === filterType.name) !== undefined
                    });
                });

                // console.log("selectByFilter setIds :", setIds);
                // console.log("selectByFilter state.datas :", state.datas);
                _datasRefs = state.datas.filter((data) => {
                    //   console.log("selectByFilter filter data :", data);
                    //   console.log("selectByFilter filter data.pid :", data.pid);
                    //   console.log(
                    //     "selectByFilter filter setIds.has(data.pid) !== -1 :",
                    //     setIds.has(data.pid)
                    //   );

                    return setIds.has(data.pid);
                });
            } else {
                _datasRefs = [...state.datas];
            }
            //   console.log("selectByFilter action.payload :", action.payload);
            //   console.log("selectByFilter _dataRefs :", _dataRefs);
            //   console.log("selectByFilter _dataRefs.length :", _dataRefs.length);
            state.dataTypes = action.payload;
            state.datasRefs = _datasRefs;
        },
        selectById: (state, action) => {
            if (!state.datas.length || typeof action.payload != "number")
                return;
            state.dataRef = state.datas.find(
                (data) => data.pid === action.payload
            );
        },
    },
    extraReducers: {
        [updateAlbumsAsync.pending]: (state) => {
            state.status = "loading";
            //   state.datas = [];
        },
        [updateAlbumsAsync.fulfilled]: (state, action) => {
            // console.log("test");
            state.status = "done";

            //   console.log("albumsRedux action.payload.Albums", action.payload.Albums);
            //   console.log(
            //     "albumsRedux action.payload.HomeAlbumIds",
            //     action.payload.HomeAlbumIds
            //   );
            //   console.log("albumsRedux action.AlbumTypes", action.payload.AlbumTypes);
            state.datas = action.payload.Albums;
            state.types = action.payload.AlbumTypes;
            //   state.datasRefs = action.payload.Albums;

            state.homeRefs = action.payload.Albums.filter((album) => {
                return action.payload.HomeAlbumIds.indexOf(album.pid) !== -1;
            });
        },
        [updateAlbumsAsync.rejected]: () => {
            // console.log("test");
            console.log("update albums 發生錯誤, 將重新整理畫面");
        },
    },
});

export const { selectByFilter, selectById } = albumsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectHomeRefs = (state) => state.albums.homeRefs;
export const selectDataTypes = (state) => state.albums.dataTypes;
export const selectDatasRefs = (state) => state.albums.datasRefs;
export const selectDatas = (state) => state.albums.datas;
export const selectDataRef = (state) => state.albums.dataRef;
export const selectTypes = (state) => state.albums.types;
export const selectStatus = (state) => state.albums.status;

export default albumsSlice.reducer;
