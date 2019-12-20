import React, { Component } from "react";

class Snackbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarShow: false,
      snackbarText: ""
    };
  }

  open(show, text) {
    this.setState({
      snackbarShow: show,
      snackbarText: text
    });

    if (this.state.snackbarShow) {
      var xs = document.getElementsByClassName("snackbars");
      for (var x of xs) {
        x.classList.add("show");
        setTimeout(function() {
          x.classList.remove("show");
        }, 3000);
      }
    }

    this.setState({
      snackbarShow: false
    });
  }

  render() {
    let arr = false;
    let d = this.state.snackbarText;
    try {
      d = JSON.parse(this.state.snackbarText);
    } catch (err) {}
    if (typeof d == "object") {
      arr = true;
    }
    return (
      <React.Fragment>
        <style
          dangerouslySetInnerHTML={{
            __html: `.snackbars {
          visibility: hidden; /* Hidden by default. Visible on click */
          min-width: 250px; /* Set a default minimum width */
          margin-left: -125px; /* Divide value of min-width by 2 */
          background-color: #333; /* Black background color */
          color: #fff; /* White text color */
          text-align: center; /* Centered text */
          border-radius: 2px; /* Rounded borders */
          padding: 16px; /* Padding */
          position: fixed; /* Sit on top of the screen */
          z-index: 1; /* Add a z-index if needed */
          left: 50%; /* Center the snackbar */
          bottom: 30px; /* 30px from the bottom */
        }
        
        /* Show the snackbar when clicking on a button (class added with JavaScript) */
        .snackbars.show {
          visibility: visible; /* Show the snackbar */
          /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
          However, delay the fade out process for 2.5 seconds */
          -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
          animation: fadein 0.5s, fadeout 0.5s 2.5s;
        }
        
        /* Animations to fade the snackbar in and out */
        @-webkit-keyframes fadein {
          from {bottom: 0; opacity: 0;}
          to {bottom: 30px; opacity: 1;}
        }
        
        @keyframes fadein {
          from {bottom: 0; opacity: 0;}
          to {bottom: 30px; opacity: 1;}
        }
        
        @-webkit-keyframes fadeout {
          from {bottom: 30px; opacity: 1;}
          to {bottom: 0; opacity: 0;}
        }
        
        @keyframes fadeout {
          from {bottom: 30px; opacity: 1;}
          to {bottom: 0; opacity: 0;}
        }`
          }}
        ></style>

        {arr ? (
          d.map((t, i) => (
            <div className="snackbars" key={`snackbar_${i}`}>
              {t}
            </div>
          ))
        ) : (
          <div className="snackbars">{d}</div>
        )}
      </React.Fragment>
    );
  }
}

export default Snackbar;
