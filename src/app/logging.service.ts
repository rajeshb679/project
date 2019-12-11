import { Injectable } from '@angular/core';

// @Injectable({
//     providedIn: 'root',
// })
export class LoggingService {
    loggingMessage: string;

    printLog(message: string): void {
        console.log(message);
        console.log(this.loggingMessage);
        this.loggingMessage = message;
    }
}
