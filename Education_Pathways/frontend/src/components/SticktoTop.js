import React, {useState, useEffect, useRef} from 'react'



const SticktoTop = (props) => {

    const [bottom, setBottomPos] = useState(0);

    const reg_style ={
        color:'white',
        overflowY:'auto',
    };

    const fixed_style ={
        // border:'solid black 10px',
        position:'fixed',
        textAlign:'center',
        zindex:'2000',
        top:'69px',
        width:'99vw',
        justifyContent:'center',
        height:'auto',
        backgroundColor:'white',
    };

    const reg_style_invisible ={
        visibility: 'hidden',
        color:'white',
        overflowY:'auto',
    };

    const fixed_style_invisible ={
        visibility: 'hidden',
        // border:'solid black 10px',
        position:'fixed',
        textAlign:'center',
        zindex:'2000',
        top:'69px',
        width:'99vw',
        justifyContent:'center',
        height:'auto',
        backgroundColor:'white',
    };

    const [, setScrollPosition] = useState(0);
    const [style, setStyle] = useState(fixed_style_invisible);
    const [style_fill, setStyleFill] = useState(reg_style);
    const [ret_top, setRetTop] = useState(0);

    const inputRef = useRef();

    const handleScroll = () => {
        //console.log(inputRef.current.getBoundingClientRect());
        const top_ = inputRef.current.getBoundingClientRect().y;
        setBottomPos(inputRef.current.getBoundingClientRect().height);

        console.log("Bottom:")
        console.log(bottom);

        console.log("TOP:")
        console.log(top_);
        
        const position = window.pageYOffset;
        console.log("Position:")
        console.log(position);
        setScrollPosition(position);
        
        if(Math.floor(top_) <= 70 && (position > ret_top )){
            setStyle(fixed_style);
            setRetTop(position);
            setStyleFill(reg_style_invisible);
        } else {
            setStyle(fixed_style_invisible);
            setStyleFill(reg_style);
            setRetTop(0);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line
    }, []);

    return (
    <div>
        <div style={style}>
            {props.children}
        </div>
        <div style={style_fill}ref={inputRef}>
            {props.children}
        </div>
    </div>
    );

 

}


export default SticktoTop;