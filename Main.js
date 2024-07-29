let selectCategory = document.querySelectorAll(
    ".category-select .selectors span"
  ),
  selectNationality = document.querySelectorAll(
    ".nationality-select .selectors span"
  ),
  LettersDiv = document.querySelector(".letters"),
  letterGuss = document.querySelector(".letter-guss"),
  wordCategory = document.querySelector(".word-category span"),
  startGame = document.querySelector(".start");
const words = ["abcdefghijklmnopqrstuvwxyz"];
let wordsArray = Array.from(...words);

fetch("Main.json")
  .then((respnse) => {
    return respnse.json();
  })
  .then((data) => {
    return data[0];
  })
  .then((category) => {
    wordsArray.forEach((word) => {
      let span = document.createElement("span");
      span.innerHTML = word.toUpperCase();
      span.className = "letter";
      LettersDiv.append(span);
    });
    selectClick();
    selectCategory.forEach((select) => {
      select.addEventListener("click", (el) => {
        let categorySelect = el.target.textContent;
        wordCategory.innerHTML = categorySelect;
        document.querySelector(".selectors .select-cat").textContent =
          categorySelect;
        if (
          categorySelect == "Scientists" ||
          categorySelect == "Movies" ||
          categorySelect == "Actors"
        ) {
          document.querySelector(".nationality-select").style.display = "flex";
          selectNationality.forEach((select) => {
            select.addEventListener("click", (el) => {
              let nationality = el.target.textContent;
              document.querySelector(
                ".nationality-select .select-nat"
              ).textContent = el.target.textContent;
              let categoryArray = category[categorySelect];
              let nationalityarray = categoryArray[nationality];

              let RandomValue = parseInt(
                Math.random() * nationalityarray.length
              );
              let Value = nationalityarray[RandomValue];
              let valueArray = Array.from(Value);
              let valuewithout = valueArray.filter((e) => e !== " ").join("");
              startGame.addEventListener("click", () => {
                document.querySelector(
                  ".selectors .select-cat"
                ).style.pointerEvents = "none";
                valueArray.forEach((letter) => {
                  let span = document.createElement("span");
                  if (letter == " ") {
                    span.className = "white-span";
                  }
                  letterGuss.append(span);
                  startGame.style.display = "none";
                });
                let gussLetter = document.querySelectorAll(".letter-guss span");
                let wrongClicked = 0;
                let successClicked = 0;
                let theDraw = document.querySelector(".hangman-draw");
                document.addEventListener("click", (e) => {
                  let theStatus = false;
                  if (e.target.className === "letter") {
                    e.target.classList.add("clicked");
                    let theClickedLetter = e.target.innerHTML.toLowerCase();
                    let theChosenWord = Array.from(Value.toLowerCase());
                    theChosenWord.forEach((wordLetter, WordIndex) => {
                      if (theClickedLetter == wordLetter) {
                        theStatus = true;
                        successClicked++;
                        gussLetter.forEach((gussLe, gussIndex) => {
                          if (WordIndex === gussIndex) {
                            gussLe.innerHTML = theClickedLetter;
                          }
                        });
                        if (successClicked === valuewithout.length) {
                          function winGame() {
                            let div = document.createElement("div");
                            div.className = "pop";
                            if (wrongClicked < 4) {
                              div.textContent = `Great Work You Do Only ${wrongClicked} Wrong Clicked`;
                            } else if (wrongClicked <= 6) {
                              div.textContent = `Good Work Your Wrong Clicked Is ${wrongClicked}, You Can Do Better Next Time..!`;
                            } else if (wrongClicked < 8) {
                              div.textContent = `Your Wrong Clicked Is ${wrongClicked} ,Next Time The Man Will Die Cause Your Bad Level -_-`;
                            }
                            document.body.append(div);
                          }
                          winGame();
                          LettersDiv.classList.add("finished");
                        }
                      }
                    });
                    if (theStatus !== true) {
                      wrongClicked++;
                      document.getElementById("fail").play();
                      theDraw.classList.add(`wrong-${wrongClicked}`);
                      if (wrongClicked === 8) {
                        function endgame() {
                          let div = document.createElement("div");
                          div.className = "pop";
                          div.textContent = `Game Over, The Word Is ${Value}`;
                          document.body.append(div);
                        }
                        endgame();
                        LettersDiv.classList.add("finished");
                      }
                    } else {
                      document.getElementById("success").play();
                    }
                  }
                });
              });
            });
          });
        } else {
          document.querySelector(".nationality-select").style.display = "none";
          if (el.target.innerHTML !== "Random") {
            let categoryArray = category[categorySelect];
            let RandomValue = parseInt(Math.random() * categoryArray.length);
            let Value = categoryArray[RandomValue];
            let valueArray = Array.from(Value);
            let valuewithout = valueArray.filter((e) => e !== " ").join("");
            startGame.addEventListener("click", () => {
              valueArray.forEach((letter) => {
                let span = document.createElement("span");
                if (letter == " ") {
                  span.className = "white-span";
                }
                letterGuss.append(span);
                startGame.style.display = "none";
              });
              let gussLetter = document.querySelectorAll(".letter-guss span");
              let wrongClicked = 0;
              let successClicked = 0;
              let theDraw = document.querySelector(".hangman-draw");
              document.addEventListener("click", (e) => {
                let theStatus = false;
                if (e.target.className === "letter") {
                  e.target.classList.add("clicked");
                  let theClickedLetter = e.target.innerHTML.toLowerCase();
                  let theChosenWord = Array.from(Value.toLowerCase());
                  theChosenWord.forEach((wordLetter, WordIndex) => {
                    if (theClickedLetter == wordLetter) {
                      theStatus = true;
                      successClicked++;
                      gussLetter.forEach((gussLe, gussIndex) => {
                        if (WordIndex === gussIndex) {
                          gussLe.innerHTML = theClickedLetter;
                        }
                      });
                      if (successClicked === valuewithout.length) {
                        function winGame() {
                          let div = document.createElement("div");
                          div.className = "pop";
                          if (wrongClicked < 4) {
                            div.textContent = `Great Work You Do Only ${wrongClicked} Wrong Clicked`;
                          } else if (wrongClicked <= 6) {
                            div.textContent = `Good Work Your Wrong Clicked Is ${wrongClicked}, You Can Do Better Next Time..!`;
                          } else if (wrongClicked < 8) {
                            div.textContent = `Your Wrong Clicked Is ${wrongClicked} ,Next Time The Man Will Die Cause Your Bad Level -_-`;
                          }
                          document.body.append(div);
                        }
                        winGame();
                        LettersDiv.classList.add("finished");
                      }
                    }
                  });
                  if (theStatus !== true) {
                    wrongClicked++;
                    document.getElementById("fail").play();
                    theDraw.classList.add(`wrong-${wrongClicked}`);
                    if (wrongClicked === 8) {
                      function endgame() {
                        let div = document.createElement("div");
                        div.className = "pop";
                        div.textContent = `Game Over, The Word Is ${Value}`;
                        document.body.append(div);
                      }
                      endgame();
                      LettersDiv.classList.add("finished");
                    }
                  } else {
                    document.getElementById("success").play();
                  }
                }
              });
            });
          } else if (el.target.innerHTML === "Random") {
            let categoryObj = Object.keys(category);
            let RandomCategory = parseInt(Math.random() * categoryObj.length);
            let categoryName = categoryObj[RandomCategory];
            wordCategory.textContent = categoryName;
            if (
              categoryName == "Scientists" ||
              categoryName == "Movies" ||
              categoryName == "Actors"
            ) {
              const Prob = ["Egypt", "Random-Nationality"];
              let randomPorb = parseInt(Math.random() * Prob.length);
              let nationality = Prob[randomPorb];

              let categoryArray = category[categoryName];
              let nationalityarray = categoryArray[nationality];
              let RandomValue = parseInt(
                Math.random() * nationalityarray.length
              );
              let Value = nationalityarray[RandomValue];
              let valueArray = Array.from(Value);
              let valuewithout = valueArray.filter((e) => e !== " ").join("");
              startGame.addEventListener("click", () => {
                document.querySelector(
                  ".selectors .select-cat"
                ).style.pointerEvents = "none";
                valueArray.forEach((letter) => {
                  let span = document.createElement("span");
                  if (letter == " ") {
                    span.className = "white-span";
                  }
                  letterGuss.append(span);
                  startGame.style.display = "none";
                });
                let gussLetter = document.querySelectorAll(".letter-guss span");
                let wrongClicked = 0;
                let successClicked = 0;
                let theDraw = document.querySelector(".hangman-draw");
                document.addEventListener("click", (e) => {
                  let theStatus = false;
                  if (e.target.className === "letter") {
                    e.target.classList.add("clicked");
                    let theClickedLetter = e.target.innerHTML.toLowerCase();
                    let theChosenWord = Array.from(Value.toLowerCase());
                    theChosenWord.forEach((wordLetter, WordIndex) => {
                      if (theClickedLetter == wordLetter) {
                        theStatus = true;
                        successClicked++;
                        gussLetter.forEach((gussLe, gussIndex) => {
                          if (WordIndex === gussIndex) {
                            gussLe.innerHTML = theClickedLetter;
                          }
                        });
                        if (successClicked === valuewithout.length) {
                          function winGame() {
                            let div = document.createElement("div");
                            div.className = "pop";
                            if (wrongClicked < 4) {
                              div.textContent = `Great Work You Do Only ${wrongClicked} Wrong Clicked`;
                            } else if (wrongClicked <= 6) {
                              div.textContent = `Good Work Your Wrong Clicked Is ${wrongClicked}, You Can Do Better Next Time..!`;
                            } else if (wrongClicked < 8) {
                              div.textContent = `Your Wrong Clicked Is ${wrongClicked} ,Next Time The Man Will Die Cause Your Bad Level -_-`;
                            }
                            document.body.append(div);
                          }
                          winGame();
                          LettersDiv.classList.add("finished");
                        }
                      }
                    });
                    if (theStatus !== true) {
                      wrongClicked++;
                      document.getElementById("fail").play();
                      theDraw.classList.add(`wrong-${wrongClicked}`);
                      if (wrongClicked === 8) {
                        function endgame() {
                          let div = document.createElement("div");
                          div.className = "pop";
                          div.textContent = `Game Over, The Word Is ${Value}`;
                          document.body.append(div);
                        }
                        endgame();
                        LettersDiv.classList.add("finished");
                      }
                    } else {
                      document.getElementById("success").play();
                    }
                  }
                });
              });
            }
            if (el.target.innerHTML === "Random") {
              if (
                !(
                  categoryName == "Scientists" ||
                  categoryName == "Movies" ||
                  categoryName == "Actors"
                )
              ) {
                let categoryArray = category[categoryName];
                let RandomValue = parseInt(
                  Math.random() * categoryArray.length
                );
                let Value = categoryArray[RandomValue];
                let valueArray = Array.from(Value);
                let valuewithout = valueArray.filter((e) => e !== " ").join("");
                startGame.addEventListener("click", () => {
                  valueArray.forEach((letter) => {
                    let span = document.createElement("span");
                    if (letter == " ") {
                      span.className = "white-span";
                    }
                    letterGuss.append(span);
                    startGame.style.display = "none";
                  });
                  let gussLetter =
                    document.querySelectorAll(".letter-guss span");
                  let wrongClicked = 0;
                  let successClicked = 0;
                  let theDraw = document.querySelector(".hangman-draw");
                  document.addEventListener("click", (e) => {
                    let theStatus = false;
                    if (e.target.className === "letter") {
                      e.target.classList.add("clicked");
                      let theClickedLetter = e.target.innerHTML.toLowerCase();
                      let theChosenWord = Array.from(Value.toLowerCase());
                      theChosenWord.forEach((wordLetter, WordIndex) => {
                        if (theClickedLetter == wordLetter) {
                          theStatus = true;
                          successClicked++;
                          gussLetter.forEach((gussLe, gussIndex) => {
                            if (WordIndex === gussIndex) {
                              gussLe.innerHTML = theClickedLetter;
                            }
                          });
                          if (successClicked === valuewithout.length) {
                            function winGame() {
                              let div = document.createElement("div");
                              div.className = "pop";
                              if (wrongClicked < 4) {
                                div.textContent = `Great Work You Do Only ${wrongClicked} Wrong Clicked`;
                              } else if (wrongClicked <= 6) {
                                div.textContent = `Good Work Your Wrong Clicked Is ${wrongClicked}, You Can Do Better Next Time..!`;
                              } else if (wrongClicked < 8) {
                                div.textContent = `Your Wrong Clicked Is ${wrongClicked} ,Next Time The Man Will Die Cause Your Bad Level -_-`;
                              }
                              document.body.append(div);
                            }
                            winGame();
                            LettersDiv.classList.add("finished");
                          }
                        }
                      });
                      if (theStatus !== true) {
                        wrongClicked++;
                        document.getElementById("fail").play();
                        theDraw.classList.add(`wrong-${wrongClicked}`);
                        if (wrongClicked === 8) {
                          function endgame() {
                            let div = document.createElement("div");
                            div.className = "pop";
                            div.textContent = `Game Over, The Word Is ${Value}`;
                            document.body.append(div);
                          }
                          endgame();
                          LettersDiv.classList.add("finished");
                        }
                      } else {
                        document.getElementById("success").play();
                      }
                    }
                  });
                });
              }
            }
          }
        }
      });
    });
  });

function selectClick() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("select-cat")) {
      selectCategory.forEach((span) => {
        span.classList.add("block");
      });
    } else if (e.target.classList.contains("block")) {
      selectCategory.forEach((span) => {
        span.classList.remove("block");
      });
    }
  });
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("select-nat")) {
      selectNationality.forEach((span) => {
        span.classList.add("block");
      });
    } else if (e.target.classList.contains("block")) {
      selectNationality.forEach((span) => {
        span.classList.remove("block");
      });
    }
  });
}
