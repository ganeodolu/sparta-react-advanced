import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { storage } from "../../shared/firebase";

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (imageUrl) => ({ imageUrl }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
	imageUrl: "",
	uploading: false,
	preview: null,
};

const uploadImageFB = (image) => {
	return function (dispatch, getState, { history }) {
		dispatch(uploading(true));
		const upload = storage.ref(`images/${image.name}`).put(image);
		upload.then((snapshot) => {
			console.log(snapshot);
			dispatch(uploading(false));
			snapshot.ref.getDownloadURL().then((url) => {
				dispatch(uploadImage(url));
				console.log(url);
			});
		});
	};
};

export default handleActions({
	[UPLOAD_IMAGE]: (state, action) =>
		produce(state, (draft) => {
			draft.imageUrl = action.payload.imageUrl;
			draft.uploading = false;
		}),
	[UPLOADING]: (state, action) =>
		produce(state, (draft) => {
			draft.uploading = action.payload.uploading;
		}),
	[SET_PREVIEW]: (state, action) => produce(state, (draft) => {
		draft.preview = action.payload.preview;
	})
}, initialState);

const actionCreators = { uploadImageFB, setPreview };

export { actionCreators };
