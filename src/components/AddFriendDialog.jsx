import { useEffect, useRef } from "react";

function AddFriendDialog({openModal, onClose}){
    const modalRef=useRef();

    useEffect(()=>{
        if(openModal) {
            modalRef.current.showModal();
        } else{
            modalRef.current.close();
        }
    }, [openModal]);

    return(
        <div className="container">
            <dialog ref={modalRef} className="addFriendDialog">
                <h2>친구추가하기</h2>
                <input className="dialogInput" placeholder="친구 아이디"></input>
                <div className="dialogButtonDiv">
                <button className="dialogButton" onClick={onClose}>추가</button>
                </div>
            </dialog>
        </div>
    )
}

export default AddFriendDialog;