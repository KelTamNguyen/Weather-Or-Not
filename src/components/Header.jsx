function Header(props) {

    return (
        <div className="header">
            <h1>To-Do List</h1>
            <p>
                ({new Date().toDateString()})
            </p>
        </div>
    )
}

export default Header;