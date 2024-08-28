

function BookmarkDetail({ Bookmark }) {
    return (
        <div style={{ display: "grid", rowGap: "4px" }}>
            <div style={{ fontSize: "22px", display: "grid", alignItems: "center" }}>
                {Bookmark.name}
            </div>
        </div>
    );
  }
  
  export default BookmarkDetail;