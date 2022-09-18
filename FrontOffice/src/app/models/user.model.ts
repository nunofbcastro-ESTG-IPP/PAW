export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public phoneNumber: number,
    public address: string,
    public dateOfBirthday: Date,
    public profileImage: string,
    public points: number,
    public purchases: [],
    public role: string
  ) {}
}
