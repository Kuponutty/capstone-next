"use client";

export default function AddUser(submit) {
    function handleClick() {
        //get wid and email values
        const wid = document.getElementById("newUserWid");
        const email = document.getElementById("newUserEmail");
        //call function from parent with those values
        submit(wid.value, email.value);
    }

    return (
    <div id = "addUser">
    <h4>Add new user</h4>
    <input type="text" id="newUserWid" name="newUserWid"></input>
    <input type="text" id="newUserEmail" name="newUserEmail"></input>
    <button onClick={() => {
        handleClick();
    }}
    >Submit</button>
  </div>
    )
}