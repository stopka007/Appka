import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import BookmarkList from "./BookmarkList";
import BookmarkListProvider from "./BookmarkListProvider";
import BookmarkProvider from "./BookmarkProvider";
import BookmarkRoute from "./BookmarkRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import background from "./Image.jpg";






function App() {
  return (
    <div style={componentStyle()}>
        <BookmarkListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<BookmarkList />} />
                <Route
                  path="BookmarkDetail2"
                  element={
                    <BookmarkProvider>
                      <BookmarkRoute />
                    </BookmarkProvider>
                  }
                />
                <Route path="*" element={"not found"} />
              </Route>
            </Routes>
          </BrowserRouter>
        </BookmarkListProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundImage: `url(${background})`, // cesta k vašemu obrázku
    backgroundSize: "cover", // přizpůsobí velikost obrázku k pokrytí celého elementu
    backgroundPosition: "center", // zarovná obrázek na střed
    backgroundRepeat: "no-repeat", // zabrání opakování obrázku
  };
}

export default App;