import React, {useState, useEffect, useRef, math} from 'react'



const SticktoTop = (props) => {

    const [bottom_pos, setBottomPos] = useState(0);

    const reg_style ={
        color:'white',
        overflowY:'auto',
    };

    const fixed_style ={
        // border:'solid black 10px',
        position:'fixed',
        textAlign:'center',
        zindex:'200',
        top:'70px',
        width:'99vw',
        justifyContent:'center',
        height:'auto',
        backgroundColor:'white',
    };

    const filler ={
        height: '400px',
    };

    const filler_none ={
        height: '0px',
    };

    const [scrollPosition, setScrollPosition] = useState(0);
    const [style, setStyle] = useState(reg_style);
    const [style_fill, setStyleFill] = useState(reg_style);
    const [ret_top, setRetTop] = useState(0);

    const inputRef = useRef();

    const handleScroll = () => {
        console.log(inputRef.current.getBoundingClientRect());
        const top_ = inputRef.current.getBoundingClientRect().y;
        setBottomPos(inputRef.current.getBoundingClientRect().height);

        const position = window.pageYOffset;
        setScrollPosition(position);
        
        if(Math.floor(top_) <= 70 && (position > ret_top )){
            setStyle(fixed_style);
            setRetTop(position);
            setStyleFill(filler);
        } else {
            setStyle(reg_style);
            setStyleFill(filler_none);
            setRetTop(0);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });


        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
    <div>
        <div style={style} ref={inputRef}>
            {props.children}
        </div>
        <div style={style_fill}>
        </div>
    </div>
    );

 

}


export default SticktoTop;