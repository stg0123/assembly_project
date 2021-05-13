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
    lawmaker_id = models.AutoField(primary_key=True)
    lawmaker_name = models.CharField(max_length=1000, blank=True, null=True)
    lawmaker_english_name = models.CharField(max_length=1000, blank=True, null=True)
    lawmaker_chinese_name = models.CharField(max_length=1000, blank=True, null=True)
    lawmaker_birthday = models.TextField(blank=True, null=True)
    lawmaker_party = models.CharField(max_length=1000, blank=True, null=True)
    lawmaker_location = models.CharField(max_length=1000, blank=True, null=True)
    lawmaker_reelection = models.CharField(max_length=1000, blank=True, null=True)
    lawmaker_elected = models.CharField(max_length=1000, blank=True, null=True)
    lawmaker_sex = models.CharField(max_length=1000, blank=True, null=True)
    lawmaker_phone = models.CharField(max_length=1000, blank=True, null=True)
    lawmaker_office = models.CharField(max_length=1000, blank=True, null=True)
    lawmaker_email = models.CharField(max_length=1000, blank=True, null=True)
    lawmaker_homepage = models.CharField(max_length=1000, blank=True, null=True)
    lawmaker_picture = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lawmaker'


class LawmakerCareer(models.Model):
    lawmaker_name = models.TextField(blank=True, null=True)
    career_date = models.TextField(blank=True, null=True)
    lawmaker_career = models.TextField(blank=True, null=True)
    lawmaker_th = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lawmaker_career'


class LawmakerRecord(models.Model):
    lawmaker_name = models.TextField(blank=True, null=True)
    lawmaker_th = models.TextField(blank=True, null=True)
    record_date = models.TextField(blank=True, null=True)
    lawmaker_record = models.TextField(blank=True, null=True)

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