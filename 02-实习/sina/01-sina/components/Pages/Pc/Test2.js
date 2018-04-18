import React, {Component} from 'react'



module.exports= class Test2 extends Component {

    constructor(props) {

        super(props)

        this.state = {
        }

    }

    render() {
        const styles = {
            root: {
                width: '100%',
                height: 'auto'
            }
        }

        console.log(AppStore.data.PortData)



        return (
            <div style={styles.root}>
                test2
            </div>
        )
    }
}