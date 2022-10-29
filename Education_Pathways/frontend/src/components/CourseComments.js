import CourseDescriptionPage from "./CourseDescription";

class CourseComments extends CourseDescriptionPage{
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log("pass in course code: ", this.props.match.params.code)
    }

    render() {
        return (
            <div> Course Comments Page </div>
        );
    }
}

export default CourseComments