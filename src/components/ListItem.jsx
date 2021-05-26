function ListItem(props) {
    return(
        <div className="list-item">
            <h2>{props.action}</h2>
            <div className="btn-div">
                {/* <input type="radio"></input> */}
                <button><i className="fas fa-edit"></i></button>
                <button><i className="fas fa-times"></i></button>
            </div>
        </div>
    );
}

export default ListItem;