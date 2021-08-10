
type ConstructorParams = {
    from: string;
    to: string;
    subject: string;
    body: string;
}

export class Email {
    readonly from: string;
    readonly to: string;
    readonly subject: string;
    readonly body: string;

    constructor(params: ConstructorParams) {
        this.from = params.from;
        this.to = params.to;
        this.subject = params.subject;
        this.body = params.body;
    }

    equals(otherEmail: Email): boolean {
        return (
            this.from === otherEmail.from &&
            this.to === otherEmail.to &&
            this.subject === otherEmail.subject &&
            this.body === otherEmail.body
        )
    }

    toPrimitives() {
        return {
            from: this.from,
            to: this.to,
            subject: this.subject,
            body: this.body
        }
    }
}