import "./LoadingSpinner.css";

/** LoadingSpinner component for Friender.
 *
 * Props: none
 * State: none
 *
 * { Matches, FindFriends } -> LoadingSpinner
 */

function LoadingSpinner() {
    const spinnerStyles = {
        width: "6rem",
        height: "6rem",
    };

    return (
        <div className="LoadingSpinner">
            <div
                className="spinner-border text-light"
                style={spinnerStyles}
                role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default LoadingSpinner;