import { Injectable } from '@angular/core';
import { IBook } from '../../interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksStoreService {
  private _initialBooksStore: IBook[] = [
    {
      id: '1',
      name: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      year: '1960',
      description:
        'A novel about the serious issues of rape and racial inequality, presented through the eyes of a child.',
    },
    {
      id: '2',
      name: '1984',
      author: 'George Orwell',
      year: '1949',
      description:
        'A dystopian novel set in a totalitarian society under constant surveillance.',
    },
    {
      id: '3',
      name: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: '1925',
      description:
        'A story about the American Dream and the disillusionment of the Jazz Age.',
    },
    {
      id: '4',
      name: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      year: '1951',
      description:
        'A novel about teenage angst and alienation, told by the iconic character Holden Caulfield.',
    },
    {
      id: '5',
      name: 'Moby-Dick',
      author: 'Herman Melville',
      year: '1851',
      description:
        'An epic tale of the obsessive quest of Captain Ahab for revenge on the white whale, Moby-Dick.',
    },
    {
      id: '6',
      name: 'Pride and Prejudice',
      author: 'Jane Austen',
      year: '1813',
      description:
        'A romantic novel that critiques the British landed gentry at the end of the 18th century.',
    },
    {
      id: '7',
      name: 'War and Peace',
      author: 'Leo Tolstoy',
      year: '1869',
      description:
        'A historical novel that chronicles the French invasion of Russia and its impact on Tsarist society.',
    },
    {
      id: '8',
      name: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      year: '1954',
      description:
        'An epic fantasy novel about the quest to destroy a powerful ring and the battle between good and evil.',
    },
    {
      id: '9',
      name: 'Ulysses',
      author: 'James Joyce',
      year: '1922',
      description:
        'A modernist novel that parallels the epic journey of Odysseus through the experiences of its protagonist, Leopold Bloom.',
    },
    {
      id: '10',
      name: 'The Odyssey',
      author: 'Homer',
      year: '-800',
      description:
        'An ancient Greek epic poem that follows the adventures of Odysseus as he returns home from the Trojan War.',
    },
    {
      id: '11',
      name: 'Crime and Punishment',
      author: 'Fyodor Dostoevsky',
      year: '1866',
      description:
        'A psychological novel about the moral dilemmas of a young impoverished student who commits a murder.',
    },
    {
      id: '12',
      name: 'Brave New World',
      author: 'Aldous Huxley',
      year: '1932',
      description:
        'A dystopian novel that explores a futuristic world of genetically modified citizens and an intelligence-based social hierarchy.',
    },
    {
      id: '13',
      name: 'The Brothers Karamazov',
      author: 'Fyodor Dostoevsky',
      year: '1880',
      description:
        'A philosophical novel that delves into questions of faith, doubt, and the nature of free will.',
    },
    {
      id: '14',
      name: 'Anna Karenina',
      author: 'Leo Tolstoy',
      year: '1877',
      description:
        'A tragic novel about the life of a noblewoman who falls into a doomed love affair.',
    },
    {
      id: '15',
      name: 'Madame Bovary',
      author: 'Gustave Flaubert',
      year: '1857',
      description:
        "A novel about the life of a doctor's wife who has adulterous affairs and lives beyond her means.",
    },
  ];
  private _books = new BehaviorSubject<IBook[]>(this._initialBooksStore);
  public books$ = this._books.asObservable();

  get allBooks() {
    return this._books.getValue();
  }

  public addBook(book: IBook) {
    this._books.next([...this.allBooks, book]);
  }

  public removeBook(id: string) {
    const updatedBooksList = this.allBooks.filter(
      (book: IBook) => book.id !== id
    );
    this._books.next(updatedBooksList);
  }

  public updateBook(updatedBook: IBook) {
    const updatedBooksList = this.allBooks.map((book: IBook) => {
      if (book.id === updatedBook.id) {
        book = updatedBook;
      }
      return book;
    });

    this._books.next(updatedBooksList);
  }
}
