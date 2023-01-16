import React, { useRef, useState } from 'react';



function DragAndDrop({data}) {

    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);

    const dragItem = useRef();
    const dragNode = useRef();
    
    const handleDragStart = (e, params) => {
        console.log("===============dragstart=============", params)
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener("dragEnd", handleDragEnd)
        setDragging(true)
        setTimeout(() => {
            setDragging(true)
        }, 0)
    }

    const handleDragEnder = (e, params) => {
        console.log("===============================", params)
        const currentItem = dragItem.current;
        if(e.target !== dragNode.current){
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.group2].items.splice(params.item2, 0, newList[currentItem.group2].items.splice(currentItem.item2, 1)[0]);
                dragItem.current = params
                return newList
            })
        }
    }

    const handleDragEnd = () => {
        console.log("=================DAGeND==============")
        setDragging(false)
        dragNode.current.removeEventListener("dragEnd", handleDragEnd)
        dragItem.current = null;
        dragNode.current = null;
    }

    const getStyle = (params) => {
        const currentItem = dragItem.current;
        if (currentItem.group2 === params.group2 && currentItem.item2 === params.item2){
            return "current dnd-item"
        }
        return "dnd-item"
    }
    
    
    return(
        <div className="drag-and-drop">
          {list.map((group1, group2)=>(
            <div key={group1.title} className="dnd-group" 
            onDragEnter={dragging && !group1.items.length?(e) => handleDragEnder(e, {group2, item2: 0}) : null}
            >
                <div className='group-title'>{group1.title}</div>
                {group1.items.map((item1, item2) => (
              
                <div 
                draggable 
                onDragStart={(e) => {handleDragStart(e, {group2, item2})}}
                onDragEnter={dragging?(e) => {handleDragEnder(e, {group2, item2})} : null} 
                key={item1} 
                className={dragging?getStyle({group2, item2}):'dnd-item'}>
                  {item1}
                </div>
              ))}
            </div>
          ))}
        </div>
    )
}

export default DragAndDrop 