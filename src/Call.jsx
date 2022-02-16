import { JitsiMeeting } from '@jitsi/web-sdk';
import React from "react";

export default class Chat extends React.PureComponent {

    handleJitsiIFrameRef = iframeRef => {
        iframeRef.style.border = '10px solid cadetblue';
        iframeRef.style.background = 'cadetblue';
        iframeRef.style.height = '400px';
    };

    render () {
        return(
            <div>
                <JitsiMeeting
                    domain="meet.jit.si"
                    roomName="njsdfksdfnkfsd"
                    onApiReady={externalApi => {this.api = externalApi}}
                    getIFrameRef={this.handleJitsiIFrameRef}
                />
            </div>
        )
    }
}
