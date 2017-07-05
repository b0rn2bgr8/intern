var router = require('express').Router();

var Intern = require('../models/intern.model');

router.get('/', function(req, res, next){
    Intern.find(function(err, interns){
        if(err){return next(err);}
        res.json(interns);
    });
});

router.get('/one/:id', function(req, res, next){
    Intern.findById({_id: req.params.id}, function(err, intern){
        if(err){return next(err);}
        res.json(intern);
    });
});




router.post('/', function(req, res, next){
    var new_intern = new Intern({
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        id_number: req.body.id_number,
        address: req.body.address,
        email: req.body.email,
        git_profile: req.body.git_profile,
        website: req.body.website,
        phone_number1: req.body.phone_number1,
        phone_number2: req.body.phone_number2,
        programme: req.body.programme,
        year_started: new Date(req.body.year_started),
        year_ended: new Date(req.body.year_ended),
        status: req.body.status,
        profile_picture: req.body.profile_picture,
        bio: req.body.bio
    });

        new_intern.associated_degree.push(req.body.associated_degree);
        new_intern.associated_universities.push(req.body.associated_universities);

        new_intern.save(function(err){
            if(err){return next(err);}
            res.status(201).json({response: "Intern added successfully"});
        });
});

router.get('/search_intern', function(req, res, next){
    Intern.find()
    .or([
        {$text: {$search: req.query.name}},
        {associated_degree: {$in: req.query.name}},
        {associated_universities: {$in: req.query.name}}
    ])
    .exec(function(err, interns){
        if(err){return next(err);}
        res.json(interns);
    });
});

router.put('/:id', function(req, res, next){
    Intern.findById({_id: req.params.id}, function(err, intern){
        if(err){return next(err);}

        intern.first_name = req.body.first_name;
        intern.middle_name = req.body.middle_name;
        intern.last_name = req.body.last_name;
        intern.id_number = parseInt(req.body.id_number);
        intern.address = req.body.address;
        intern.email = req.body.email;
        intern.git_profile = req.body.git_profile;
        intern.website = req.body.website;
        intern.phone_number1 = req.body.phone_number1;
        intern.phone_number2 = req.body.phone_number2;
        intern.programme = req.body.programme;
        intern.year_stated = new Date(req.body.year_stated);
        intern.year_ended = new Date(req.body.year_ended);
        intern.status = req.body.status;
        intern.profile_picture = req.body.profile_picture;
        intern.bio = req.body.bio;
    });

        intern.associated_degree.push(req.body.associated_degree);
        intern.associated_universities.push(req.body.associated_universities);

        intern.save(function(err){
            if(err){return next(err);}
            res.status(201).json({response: "Intern added successfully"});
        });
});

router.delete('/:id', function(req, res, next){
    Intern.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err){return next(err);}
        res.status(200).json({response: "Intern removed successfully"});
    });
});

module.exports = router;