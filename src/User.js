import { Book } from './Book.js';

/**
 * @param {string} name
 * @param {Date} date
 * @constructor
 * @property {string} name
 * @property {Date} date
 * @property {Book[]} myBooks
 * @property {User[]} friends
 * @property {Book[]} likes
 */
export function User(name, date) {
    this.name = name;
    this.date = date;
    this.myBooks = [];
    this.friends = [];
    this.likes = [];
    this.addToFriends = function (friend) {
        if(this.friends.includes(friend)) {
            this.friends = this.friends.filter((user) => user !== friend);
            friend.friends = friend.friends.filter((user) => user !== this);
        } else {
            this.friends.push(friend);
            friend.friends.push(this);
        }
    };

    this.removeFriend = this.addToFriends;
    
    this.likeBook = function (book) {
        if (this.likes.includes(book)) {
            this.likes = this.likes.filter((currentBook) => currentBook !== book);
            book.likedUsers = book.likedUsers.filter((user) => user !== this);
        }else {
            this.likes.push(book);
            book.likedUsers.push(this);
        }
        
    }

    this.unlikeBook = this.likeBook;


    Object.defineProperty(this, 'friendsNames', {
        get() {
            let friendsNames = this.friends.map(({ name }) => name).join(', ');
            return friendsNames;
        }
    });

    Object.defineProperty(this, 'likedBooks', {
        get() {
            let booksNames = this.likes.map(({ title }) => title).join(', ');
            return  booksNames;
        }
    });

    Object.defineProperty(this, 'publishedBooks', {
        get() {
            let booksNames = this.myBooks.map(({ title }) => title).join(', ');
            return  booksNames;
        }
    });


}


   