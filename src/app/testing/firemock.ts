import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Firemocksvc {
    private _auth: BehaviorSubject<any> = new BehaviorSubject<any>(
        {
            uid: 'useridfake',
            auth: {
                displayName: "nameymcnameface"
            }
        }
    );
    public authState = this._auth.asObservable();

    list() {
    }

    object() {
    }
}