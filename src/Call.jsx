import { JitsiMeeting } from '@jitsi/web-sdk';
import PropTypes from "prop-types";
import React from "react";

export default class Call extends React.PureComponent {

    handleJitsiIFrameRef = iframeRef => {
        iframeRef.style.border = '10px solid cadetblue';
        iframeRef.style.background = 'cadetblue';
        iframeRef.style.height = '400px';
    };

    render () {
        const {roomName} = this.props;
        return(
            <div>
                <JitsiMeeting
                    domain="meet.jit.si"
                    roomName={roomName}
                    onApiReady={externalApi => {this.api = externalApi}}
                    getIFrameRef={this.handleJitsiIFrameRef}
                />
            </div>
        )
    }
}

Call.propTypes = {
    roomName: PropTypes.object.isRequired,
}