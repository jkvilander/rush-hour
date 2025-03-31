import useMenuStore from "../stores/menu";

export function Title() {
    function handleTitleClick() {
        useMenuStore.getState().toggle();
    }

    return (
        <div className="title" onClick={() => handleTitleClick()}>
            <span>Rush</span>
            <span>Hour</span>
        </div>
    );
}