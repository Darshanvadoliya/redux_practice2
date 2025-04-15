import React from 'react'

function AddTaskPortal({ children }) {
    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AddTaskPortal