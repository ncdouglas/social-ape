let db = {
    users: [
        {
            userId: '8V8sdXqO6ZQrkJwJY50Gr4CQsA92',
            email: 'new6@email.com',
            handle: 'new6',
            createdAt: '2021-06-25T15:05:28.233Z',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/socialape-8cb96.appspot.com/o/57569177090.jpg?alt=media',
            bio: 'Hello, my name is user',
            website: 'https://user.com',
            location: 'London, UK'
        }
    ],
    screams: [
        {
            userHandle: 'user', 
            body: 'scream body',
            createdAt: '2021-06-08T16:45:57.129Z',
            likeCount: 5,
            commentCount: 2
        }
    ],
    comments: [
        {
            userHandle: 'user', 
            screamId: '8V8sdXqO6ZQrkJwJY50Gr4CQsA92',
            body: 'nice one mate!',
            createdAt: '2021-06-08T16:45:57.129Z'
        }
    ],
    notifications: [
        {
            recipient: 'user',
            sender: 'john',
            read: 'true | false',
            screamId: '8V8sdXqO6ZQrkJwJY50Gr4CQsA92',
            type: 'like | comment',
            createdAt: '2021-06-08T16:45:57.129Z'
        }
    ]
};

const UserDetails = {
    //Redux data 
    credentials: {
        userId: '8V8sdXqO6ZQrkJwJY50Gr4CQsA92',
        email: 'new6@email.com',
        handle: 'new6',
        createdAt: '2021-06-25T15:05:28.233Z',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/socialape-8cb96.appspot.com/o/57569177090.jpg?alt=media',
        bio: 'Hello, my name is user',
        website: 'https://user.com',
        location: 'London, UK'
    },
    likes: [
        {
            userHandle: 'user',
            screamId: '8V8sdXqO6ZQrkJwJY50Gr4CQsA92'
        },
        {
            userHandle: 'user',
            screamId: '9V9sdXqO6ZQrkJwJY50Gr4CQsA92'
        }
    ]
}