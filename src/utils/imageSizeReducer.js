import Resizer from "react-image-file-resizer";

// takes input FILES ARRAY, update state function, maximum files to iterate over
// reduces size and sets the reduced base64 to the state
//
// IMPORTANT : expects state to be initialised to an array
// e.g. -
// const [media, setMedia] = useState([])
// ...
// const files = event.target.files;
// ...
// imageSizeReducer(files, setMedia, 3);

function imageSizeReducer(files, setState, maxFilesLimit) {
  let fileCount = 0;
  Object.keys(files).map((item) => {
    try {
      Resizer.imageFileResizer(
        files[item],
        300, // max width
        300, // max height
        "JPEG", // compress format
        100, // quality
        0, // rotation
        (uri) => {
          fileCount++;
          if (fileCount < maxFilesLimit + 1)
            setState((p) => {
              let newState = [...p];
              newState.push(uri);
              return newState;
            });
        },
        "base64"
      );
    } catch (err) {
      console.log(err);
    }
  });
}

export default imageSizeReducer;
