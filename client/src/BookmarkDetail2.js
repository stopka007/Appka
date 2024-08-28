function BookmarkDetail2({ Bookmark }) {

    function average(str) {
        // Rozdělení stringu na pole čísel
        let numbers = str.split(',').map(Number);

        // Spočítání sumy všech čísel
        let sum = numbers.reduce((acc, num) => acc + num, 0);

        // Spočítání průměru
        let average = sum / numbers.length;

        return parseFloat(average.toFixed(3));
    }

    function calculateMedian(str) {
        // Rozdělení stringu na pole čísel
        let numbers = str.split(',').map(Number);

        // Seřazení čísel vzestupně
        numbers.sort((a, b) => a - b);

        // Spočítání mediánu
        let middle = Math.floor(numbers.length / 2);

        if (numbers.length % 2 === 0) {
            // Pokud je počet čísel sudý, medián je průměr dvou prostředních hodnot
            return parseFloat(((numbers[middle - 1] + numbers[middle]) / 2).toFixed(3));
        } else {
            // Pokud je počet čísel lichý, medián je prostřední hodnota
            return parseFloat(numbers[middle].toFixed(3));
        }
    }

  return (
      <div style={{display: "grid", rowGap: "4px"}}>
          <div style={{fontSize: "18px"}}>Průměr: {average(Bookmark.data)}</div>
          <div style={{fontSize: "18px"}}>Medián: {calculateMedian(Bookmark.data)}</div>
          <div className="row" style={{margin: "0"}}>
              <div className="col-12 col-sm-6" style={{padding: "0"}}>
              </div>
              <div className="col-12 col-md-6" style={decisionColumnStyle()}>
              </div>
          </div>
      </div>
  );
}

function decisionColumnStyle() {
    return {display: "flex", justifyContent: "right", padding: "0" };
}

export default BookmarkDetail2;