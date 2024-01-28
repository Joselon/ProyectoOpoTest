import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './eit-user';
import './jno-event-menu'
import { users } from '../data/users.js';

export class EitUsersList extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    static get properties() {
        return {
            orderTypes: { type: Array },
            selectedOrder: { type: String },
            users: { type: Array },
            orderedUsers: { type: Array },
            userSources: { type: Array },
            selectedSource: { type: String },
        };
    }

    constructor() {
        super();
        this.orderTypes = ['default', 'asc', 'desc'];
        this.selectedOrder = 'default';
        this.userSources = ['json FILE', 'Rest API'];
        this.selectedSource = 'json FILE';
        this.setUsers(this.selectedSource);
    }

    render() {
        return html`
            <jno-event-menu
                title='Fuente:'
                .options=${this.userSources} 
                selectedOption=${this.selectedSource}
                @jno-event-menu-changed=${this.changeSelectedSource}
            ></jno-event-menu>
            <jno-event-menu
                title='Orden:' 
                .options=${this.orderTypes} 
                selectedOption=${this.selectedOrder}
                @jno-event-menu-changed=${this.changeSelectedOrder}
            ></jno-event-menu>
            
            ${this.directiveRepeatTemplate}
        `;
    }

    get mapRepeatTemplate() {
        return html`
            ${this.orderedUsers.map(user => html`
                    <eit-user .user="${user}"></eit-user>
            `)}
        `;
    }

    get directiveRepeatTemplate() {
        return html`
            ${repeat(this.orderedUsers, (user) => user.id, (user, index) => html`
                    <eit-user .user="${user}"></eit-user>
            `)}
        `;
    }

    doOrder(order) {
        if (order === 'default') {
            this.orderedUsers = [];
            for (const user of this.users) {
                this.orderedUsers.push(user);
            }
        }
        else {
            this.orderedUsers = this.orderedUsers.sort((a, b) => {
                if (a.name === b.name) {
                    return 0;
                }
                if (order === 'asc') {
                    return a.name > b.name ? 1 : -1;
                } else {
                    return a.name < b.name ? 1 : -1;
                }
            });
        }
    }

    setUsers(source) {
        this.users = [];
        this.orderedUsers = [];
        if (source === 'json FILE'){
            this.users = [...users];
            this.orderedUsers = [...this.users];
        }
        else {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(users => {
                    this.users = [...users];
                    this.orderedUsers = [...this.users];
                    console.log('Recibida respuesta de https://jsonplaceholder.typicode.com')
                });
        }
    }

    changeSelectedOrder(e) {
        this.selectedOrder = e.detail.selectedOption;
        this.doOrder(this.selectedOrder);
    }

    changeSelectedSource(e) {
        this.selectedSource = e.detail.selectedOption;
        this.setUsers(this.selectedSource);
        this.selectedOrder = 'default';
    }
}
customElements.define('eit-users-list', EitUsersList);
