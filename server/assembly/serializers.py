from rest_framework import serializers
from .models import AuthUser
from .models import Law, Lawmaker

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ['id', 'username', 'password','is_superuser','is_staff','is_active','date_joined']


class LawSerializer(serializers.ModelSerializer):
    class Meta:
        model = Law
        fields = [
            'law_id',
            'bill_name',
            'bill_no',
            'committee_name',
            'propose_dt',
            'proc_dt',
            'law_dislike',
            'law_like',
            'law_pdf',
            'law_pass',
            'law_summary',
            'main_lawmaker',
            'sum_lawmaker',
            'proposal_kind',
        ]
class LawmakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lawmaker
        fields = [
            'id',
            'name',
            'english_name',
            'chinese_name',
            'birthday',
            'party',
            'location',
            'reelection',
            'elected',
            'sex',
            'phone',
            'office',
            'email',
            'homepage',
            'picture',
        ]
