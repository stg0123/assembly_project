from django.db import models

class Law(models.Model):
    law_id = models.CharField(max_length=255)
    bill_name = models.TextField(blank=True, null=True)
    bill_no = models.TextField(blank=True, null=True)
    committee_name = models.TextField(blank=True, null=True)
    propose_dt = models.TextField(blank=True, null=True)
    proc_dt = models.TextField(blank=True, null=True)
    law_dislike = models.IntegerField(blank=True, null=True)
    law_like = models.IntegerField(blank=True, null=True)
    law_pdf = models.TextField(blank=True, null=True)
    law_pass = models.CharField(max_length=255, blank=True, null=True)
    law_summary = models.TextField(blank=True, null=True)
    main_lawmaker = models.TextField(blank=True, null=True)
    sum_lawmaker = models.IntegerField(blank=True, null=True)
    proposal_kind = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'law'


class Lawmaker(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    english_name = models.CharField(max_length=1000, blank=True, null=True)
    chinese_name = models.CharField(max_length=1000, blank=True, null=True)
    birthday = models.TextField(blank=True, null=True)
    party = models.CharField(max_length=1000, blank=True, null=True)
    location = models.CharField(max_length=1000, blank=True, null=True)
    reelection = models.CharField(max_length=1000, blank=True, null=True)
    elected = models.CharField(max_length=1000, blank=True, null=True)
    sex = models.CharField(max_length=1000, blank=True, null=True)
    phone = models.CharField(max_length=1000, blank=True, null=True)
    office = models.CharField(max_length=1000, blank=True, null=True)
    email = models.CharField(max_length=1000, blank=True, null=True)
    homepage = models.CharField(max_length=1000, blank=True, null=True)
    picture = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lawmaker'


class LawmakerCareer(models.Model):
    lawmaker_name = models.TextField(blank=True, null=True)
    career_date = models.TextField(blank=True, null=True)
    career = models.TextField(blank=True, null=True)
    lawmaker_th = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lawmaker_career'


class LawmakerRecord(models.Model):
    lawmaker_name = models.TextField(blank=True, null=True)
    lawmaker_th = models.TextField(blank=True, null=True)
    record_date = models.TextField(blank=True, null=True)
    record = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lawmaker_record'


class LikeLaw(models.Model):
    user_id = models.CharField(primary_key=True, max_length=255)
    law_id = models.CharField(max_length=255)
    like_dislike = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'like_law'
        unique_together = (('user_id', 'law_id'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'

class Comments(models.Model):
    comment_id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=1000, blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    like_dislike = models.TextField(blank=True, null=True)
    law_id = models.CharField(max_length=1000, blank=True, null=True)
    comment_like = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comments'


class CommentsLike(models.Model):
    user_id = models.CharField(primary_key=True, max_length=255)
    comment_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comments_like'